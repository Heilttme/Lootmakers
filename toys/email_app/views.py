from django.contrib.auth.tokens import default_token_generator
from templated_mail.mail import BaseEmailMessage

from djoser import utils
# from djoser.conf import settings
from djoser.conf import settings as djoser_settings

class ActivationEmail(BaseEmailMessage):
    template_name = "emails/activation.html"

    def get_context_data(self):
        # ActivationEmail can be deleted
        context = super().get_context_data()

        user = context.get("user")
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        # context["url"] = settings.DJOSER.ACTIVATION_URL.format(**context)
        context["url"] = djoser_settings.ACTIVATION_URL.format(**context)
        return context


class ConfirmationEmail(BaseEmailMessage):
    template_name = "emails/confirmation.html"