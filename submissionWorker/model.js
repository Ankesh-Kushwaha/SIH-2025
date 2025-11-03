let modelInstance = null;

export async function loadModel() {
  if (modelInstance) return modelInstance;

  // Load your ML model once (e.g. TensorFlow, ONNX, etc.)
  // modelInstance = await tf.loadGraphModel('path/to/model');
  modelInstance = { fakeModel: true }; // example placeholder

  return modelInstance;
}

export async function runMLModel(evidenceUrl) {
  // use the loaded modelInstance
  // e.g. const result = await modelInstance.predict(...);
  console.log("🧠 Running model on:", evidenceUrl);

  // simulate output
  return { isValid: Math.random() > 0.5, confidence: Math.random() };
}
