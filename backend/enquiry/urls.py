from django.urls import path
from . import views

urlpatterns = [
    # Enquiry
    path('enquiry/', views.enquiry),
    path('enquiries/', views.get_enquiries),
    path('enquiry/<int:pk>/', views.enquiry_detail),

    # Product
    path('products/', views.products),
    path('products/stats/', views.product_stats),
    path('products/<int:pk>/', views.product_detail),

    # Customer (GET only — Enquiry table-லயே இருந்து fetch)
    path('customers/', views.customers),
    # ✅ customer_detail remove பண்ணிட்டோம்

    # Order
    path('orders/', views.orders),
    path('orders/<int:pk>/', views.order_detail),
]