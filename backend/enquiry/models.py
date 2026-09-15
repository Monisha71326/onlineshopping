from django.db import models


class Enquiry(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    message = models.TextField(blank=True)
    photo = models.ImageField(upload_to='enquiry_photos/', blank=True, null=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    CATEGORY_CHOICES = [
        ('dress', 'Dress'),
        ('jwl', 'Jewellery'),
        ('shoe', 'Footwear'),
        ('beauty', 'Beauty'),
        ('home', 'Home'),
        ('kids', 'Kids'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=200)
    emoji = models.CharField(max_length=10, blank=True, default='📦')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    price = models.PositiveIntegerField(default=0)
    stock = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.name


# ✅ Customer table தேவையில்லை — Enquiry-யே Customer!


class Order(models.Model):
    customer = models.ForeignKey(Enquiry, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    qty = models.PositiveIntegerField(default=1)
    amount = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=20, default="Pending")

    def __str__(self):
        return f"{self.customer.name} - {self.product.name}"
