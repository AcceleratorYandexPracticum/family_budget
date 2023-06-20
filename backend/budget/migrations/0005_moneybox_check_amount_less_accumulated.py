# Generated by Django 4.1.3 on 2023-06-17 18:34

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("budget", "0004_alter_financetransaction_created_and_more"),
    ]

    operations = [
        migrations.AddConstraint(
            model_name="moneybox",
            constraint=models.CheckConstraint(
                check=models.Q(("amount__gte", models.F("accumulated"))),
                name="check_amount_less_accumulated",
                violation_error_message="The accumulated amount cannot be more than the total",
            ),
        ),
    ]
