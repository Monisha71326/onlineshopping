from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Sum

from .models import Enquiry, Product, Order  # ✅ Customer remove
from .serializers import EnquirySerializer, ProductSerializer, OrderSerializer  # ✅ CustomerSerializer remove


# =======================
# ENQUIRY API
# =======================

@csrf_exempt
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def enquiry(request):
    serializer = EnquirySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def get_enquiries(request):
    enquiries = Enquiry.objects.all().order_by('-id')
    data = [
        {"id": e.id, "name": e.name, "email": e.email, "phone": e.phone, "message": e.message}
        for e in enquiries
    ]
    return Response(data)


@csrf_exempt
@api_view(['PUT', 'DELETE'])
@parser_classes([MultiPartParser, FormParser])
def enquiry_detail(request, pk):
    try:
        instance = Enquiry.objects.get(pk=pk)
    except Enquiry.DoesNotExist:
        return Response({"error": "Not found"}, status=404)

    if request.method == "PUT":
        serializer = EnquirySerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    if request.method == "DELETE":
        instance.delete()
        return Response({"message": "Deleted"}, status=200)


# =======================
# PRODUCT API
# =======================

@api_view(['GET', 'POST'])
@parser_classes([MultiPartParser, FormParser])
def products(request):
    if request.method == "GET":
        prods = Product.objects.all().order_by('-id')
        data = [
            {
                "id": p.id, "name": p.name, "emoji": p.emoji,
                "category": p.category, "price": p.price, "stock": p.stock,
                "image_url": p.image.url if p.image else None,
                "created_at": p.created_at,
            }
            for p in prods
        ]
        return Response(data)

    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@csrf_exempt
@api_view(['PUT', 'DELETE'])
@parser_classes([MultiPartParser, FormParser])
def product_detail(request, pk):
    try:
        instance = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({"error": "Not found"}, status=404)

    if request.method == "PUT":
        serializer = ProductSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    if request.method == "DELETE":
        instance.delete()
        return Response({"message": "Deleted"}, status=200)


# =======================
# PRODUCT STATS API
# =======================

@api_view(['GET'])
def product_stats(request):
    prods = Product.objects.all()
    total_products = prods.count()
    total_stock = prods.aggregate(total=Sum('stock'))['total'] or 0
    total_value = sum(p.price * p.stock for p in prods)
    low_stock = prods.filter(stock__lte=50).count()

    return Response({
        "total_products": total_products,
        "total_stock": total_stock,
        "total_value": total_value,
        "low_stock": low_stock,
    })


# =======================
# CUSTOMER API (Enquiry table-லயே இருந்து fetch) ✅
# =======================

@api_view(['GET'])
def customers(request):
    # ✅ Enquiry table data return — Customer table தேவையில்லை
    enquiries = Enquiry.objects.all().order_by('-id')
    data = [{"id": e.id, "name": e.name} for e in enquiries]
    return Response(data)


# customer_detail தேவையில்லை — Enquiry-யே manage பண்றோம் ✅


# =======================
# ORDER API ✅
# =======================

@api_view(['GET', 'POST'])
def orders(request):
    if request.method == "GET":
        all_orders = Order.objects.select_related('customer', 'product').all().order_by('-id')
        serializer = OrderSerializer(all_orders, many=True)
        return Response(serializer.data)

    if request.method == "POST":
        customer_id = request.data.get('customer')
        product_id = request.data.get('product')
        qty = int(request.data.get('qty', 1))

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)

        amount = product.price * qty

        order = Order.objects.create(
            customer_id=customer_id,
            product_id=product_id,
            qty=qty,
            amount=amount,
        )

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=201)


@api_view(['PUT', 'DELETE'])
def order_detail(request, pk):
    try:
        instance = Order.objects.select_related('customer', 'product').get(pk=pk)
    except Order.DoesNotExist:
        return Response({"error": "Not found"}, status=404)

    if request.method == "PUT":
        new_status = request.data.get('status')
        if new_status not in ['Pending', 'Shipped', 'Delivered']:
            return Response({"error": "Invalid status"}, status=400)
        instance.status = new_status
        instance.save()
        serializer = OrderSerializer(instance)
        return Response(serializer.data)

    if request.method == "DELETE":
        instance.delete()
        return Response({"message": "Deleted"}, status=200)