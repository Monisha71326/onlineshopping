from django.urls import path
from . import views

urlpatterns = [
    path('enquiry/', views.enquiry),
    path('enquiries/', views.get_enquiries),
    path('enquiry/<int:pk>/', views.enquiry_detail),
    path('products/', views.products),
    path('products/stats/', views.product_stats),
    path('products/<int:pk>/', views.product_detail),
    path('customers/', views.customers),
    path('orders/', views.orders),
    path('orders/<int:pk>/', views.order_detail),
]