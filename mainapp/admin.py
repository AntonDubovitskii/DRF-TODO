from django.contrib import admin
from .models import Author, LibraryUser

admin.site.register(Author)
admin.site.register(LibraryUser)

