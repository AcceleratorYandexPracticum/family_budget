# Generated by Django 4.2.2 on 2023-07-07 13:40

import re

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="first_name",
            field=models.CharField(
                blank=True,
                max_length=50,
                validators=[
                    django.core.validators.RegexValidator(
                        re.compile("^([^\\W\\d_]|[\\s\\-—])+"),
                        "Enter a valid `name` value consisting of only letters and symbols `-`. —",
                        "invalid",
                    )
                ],
                verbose_name="first name",
            ),
        ),
        migrations.AlterField(
            model_name="user",
            name="last_name",
            field=models.CharField(
                blank=True,
                max_length=50,
                validators=[
                    django.core.validators.RegexValidator(
                        re.compile("^([^\\W\\d_]|[\\s\\-—])+"),
                        "Enter a valid `name` value consisting of only letters and symbols `-`. —",
                        "invalid",
                    )
                ],
                verbose_name="last name",
            ),
        ),
    ]
