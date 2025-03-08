let model;

// Load the pre-trained MobileNet model
async function loadModel() {
    model = await mobilenet.load();
    console.log("Model Loaded!");
}

loadModel();

// Preview uploaded image
document.getElementById("imageUpload").addEventListener("change", function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById("previewImage").src = e.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

// Predict image category
async function predictImage() {
    const imgElement = document.getElementById("previewImage");

    if (!imgElement.src) {
        alert("Please upload an image first!");
        return;
    }

    const predictions = await model.classify(imgElement);
    console.log(predictions);

    // Display the highest probability prediction
    document.getElementById("result").innerText = 
        `Prediction: ${predictions[0].className} (Confidence: ${Math.round(predictions[0].probability * 100)}%)`;
}
