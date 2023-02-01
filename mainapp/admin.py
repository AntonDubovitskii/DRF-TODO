from django.contrib import admin
from .models import Author, LibraryUser, TODO, Worker, Project

admin.site.register(Author)
admin.site.register(LibraryUser)
admin.site.register(TODO)
admin.site.register(Project)
admin.site.register(Worker)
