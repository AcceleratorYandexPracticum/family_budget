# Generated by Django 4.1.3 on 2023-06-05 11:55

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("budget", "0004_remove_category_description_category_color_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Account",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "title",
                    models.CharField(max_length=70, verbose_name="Название"),
                ),
                (
                    "balance",
                    models.IntegerField(default=0, verbose_name="Баланс"),
                ),
            ],
            options={
                "verbose_name": "Счет",
                "verbose_name_plural": "Счета",
            },
        ),
        migrations.CreateModel(
            name="AccountIcon",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=100)),
                (
                    "slug",
                    models.SlugField(blank=True, max_length=100, unique=True),
                ),
                ("image", models.ImageField(upload_to="account_icons")),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="CategoryIcon",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=100)),
                (
                    "slug",
                    models.SlugField(blank=True, max_length=100, unique=True),
                ),
                ("image", models.ImageField(upload_to="category_icons")),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.RemoveField(
            model_name="balance",
            name="user",
        ),
        migrations.RemoveField(
            model_name="categoryincome",
            name="user",
        ),
        migrations.DeleteModel(
            name="Currency",
        ),
        migrations.RenameField(
            model_name="moneybox",
            old_name="accumulation",
            new_name="accumulated",
        ),
        migrations.RemoveField(
            model_name="income",
            name="category",
        ),
        migrations.RemoveField(
            model_name="moneybox",
            name="description",
        ),
        migrations.AddField(
            model_name="category",
            name="slug",
            field=models.SlugField(default=1, max_length=100, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="category",
            name="color",
            field=models.CharField(
                blank=True,
                max_length=7,
                unique=True,
                verbose_name="Цвет категории расхода",
            ),
        ),
        migrations.DeleteModel(
            name="Balance",
        ),
        migrations.DeleteModel(
            name="CategoryIncome",
        ),
        migrations.AddField(
            model_name="account",
            name="icon",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="accounts",
                to="budget.accounticon",
                verbose_name="Иконка",
            ),
        ),
        migrations.AddField(
            model_name="account",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="balances",
                to=settings.AUTH_USER_MODEL,
                verbose_name="Баланс пользователя",
            ),
        ),
        migrations.AlterField(
            model_name="category",
            name="icon",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="categories",
                to="budget.categoryicon",
                verbose_name="Иконка",
            ),
        ),
    ]
