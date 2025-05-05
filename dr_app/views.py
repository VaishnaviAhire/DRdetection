from django.shortcuts import render
from .forms import ImageUploadForm
import os
from django.conf import settings

def upload_image(request):
    prediction = None
    image_url = None

    if request.method == 'POST':
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            image = form.cleaned_data['image']
            image_path = os.path.join(settings.MEDIA_ROOT, image.name)

            # Save image to media/
            with open(image_path, 'wb+') as destination:
                for chunk in image.chunks():
                    destination.write(chunk)

            image_url = settings.MEDIA_URL + image.name

            # 🔮 Placeholder for ML model prediction
            prediction = "No DR detected"  # You'll replace this later

    else:
        form = ImageUploadForm()

    return render(request, 'dr_app/upload.html', {
        'form': form,
        'prediction': prediction,
        'image_url': image_url
    })
