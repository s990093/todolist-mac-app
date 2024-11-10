from django.contrib import admin
from .models import Todo

@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ('text', 'completed', 'priority', 'created_at', 'updated_at')
    list_filter = ('completed', 'priority', 'created_at')
    search_fields = ('text',)
    ordering = ('-created_at',)
    
    list_editable = ('completed', 'priority')
    
    date_hierarchy = 'created_at'
    
    list_per_page = 20
    
    fieldsets = (
        ('基本信息', {
            'fields': ('text', 'completed')
        }),
        ('進階選項', {
            'fields': ('priority',),
            'classes': ('collapse',)
        }),
        ('時間信息', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('wide',)
        }),
    )
    
    readonly_fields = ('created_at', 'updated_at')
