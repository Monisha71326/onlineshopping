from rest_framework import serializers
from .models import Enquiry, Product, Order  # ✅ Customer remove
import cloudinary.uploader


class EnquirySerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    photo = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Enquiry
        fields = ["id", "name", "email", "phone", "message", "photo", "photo_url"]
        extra_kwargs = {
            "photo": {"write_only": True, "required": False}
        }

    def get_photo_url(self, obj):
        if obj.photo:
            return obj.photo.url
        return None


class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Product
        fields = [
            "id", "name", "emoji", "category",
            "price", "stock", "image", "image_url", "created_at",
        ]
        extra_kwargs = {
            "image": {"write_only": True, "required": False}
        }

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

    def update(self, instance, validated_data):
        new_image = validated_data.get("image", None)
        if new_image and instance.image:
            try:
                cloudinary.uploader.destroy(instance.image.public_id)
            except Exception:
                pass
        return super().update(instance, validated_data)


# ✅ Order — Enquiry-யே customer
class OrderSerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source="customer.name", read_only=True)
    product_name = serializers.CharField(source="product.name", read_only=True)

    class Meta:
        model = Order
        fields = [
            "id", "customer", "product", "qty",
            "amount", "status", "customer_name", "product_name",
        ]