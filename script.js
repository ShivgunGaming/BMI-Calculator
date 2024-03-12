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
      var resultElement = document.getElementById('result');
      resultElement.innerHTML = "Please enter valid height measurements.";
      return; // Exit the function if height measurements are invalid
    }
    
    // Convert height to meters
    var heightInMeters = ((feet * 12) + inches) * 0.0254;
  
    var bmi = weight / (heightInMeters * heightInMeters);
  
    var bmiValueElement = document.getElementById('bmiValue');
    bmiValueElement.textContent = bmi.toFixed(2);
  
    var bmiScaleElement = document.getElementById('bmiScale');
    bmiScaleElement.style.width = bmi + "%";
  
    var interpretation;
    if (bmi < 18.5) {
      interpretation = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      interpretation = "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
      interpretation = "Overweight";
    } else {
      interpretation = "Obese";
    }
  
    var interpretationElement = document.getElementById('interpretation');
    interpretationElement.textContent = interpretation;
  }  