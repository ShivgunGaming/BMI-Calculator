document.addEventListener('DOMContentLoaded', function() {
  var calculateBtn = document.getElementById('calculateBtn');

  calculateBtn.addEventListener('click', function() {
    calculateBMI();
  });
});

function calculateBMI() {
  var weight = parseFloat(document.getElementById('weight').value);
  var feet = parseFloat(document.getElementById('feet').value);
  var inches = parseFloat(document.getElementById('inches').value);
  
  // Check if height inputs are valid numbers
  if (isNaN(feet) || isNaN(inches)) {
    alert("Please enter valid height measurements.");
    return; // Exit the function if height measurements are invalid
  }
  
  // Convert height to meters
  var heightInMeters = ((feet * 12) + inches) * 0.0254;

  var bmi = weight / (heightInMeters * heightInMeters);

  var bmiValueElement = document.getElementById('bmiValue');
  bmiValueElement.textContent = bmi.toFixed(2);

  var bmiScaleElement = document.getElementById('bmiScale');
  var interpretationElement = document.getElementById('interpretation');

  var interpretation;
  if (bmi < 18.5) {
    interpretation = "Underweight";
    bmiScaleElement.className = 'bmi-scale underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    interpretation = "Normal weight";
    bmiScaleElement.className = 'bmi-scale normal-weight';
  } else if (bmi >= 25 && bmi < 29.9) {
    interpretation = "Overweight";
    bmiScaleElement.className = 'bmi-scale overweight';
  } else {
    interpretation = "Obese";
    bmiScaleElement.className = 'bmi-scale obese';
  }
  
  bmiScaleElement.style.width = ((bmi - 15) * 2) + '%';

  interpretationElement.textContent = interpretation;
}
