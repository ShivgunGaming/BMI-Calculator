document.addEventListener('DOMContentLoaded', function() {
  var calculateBtn = document.getElementById('calculateBtn');
  var darkModeToggle = document.getElementById('darkModeToggle');
  var body = document.body;

  calculateBtn.addEventListener('click', function() {
    calculateBMI();
  });

  darkModeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
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

  var interpretationElement = document.getElementById('interpretation');
  interpretationElement.textContent = interpretation;

  // Call the API to fetch additional health information based on BMI category
  fetchNutritionalInfo(interpretation);
}

function fetchNutritionalInfo(interpretation) {
  var foodCategory;
  switch(interpretation) {
    case "Underweight":
      foodCategory = "high calorie, high protein";
      break;
    case "Normal weight":
      foodCategory = "balanced diet";
      break;
    case "Overweight":
      foodCategory = "low calorie, high fiber";
      break;
    case "Obese":
      foodCategory = "low calorie, low fat";
      break;
    default:
      foodCategory = "balanced diet";
  }

  var apiUrl = 'https://api.nal.usda.gov/fdc/v1/foods/search?query=' + encodeURIComponent(foodCategory) + '&api_key=Mmj2eEeOYxgK5bHzajmyevdq2QsX2LtbY1rq5Dg6';
  
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.foods && data.foods.length > 0) {
        // Filter out specific types of foods or beverages if necessary
        var filteredFoods = data.foods.filter(food => {
          // Exclude alcoholic beverages
          return !food.description.toLowerCase().includes("alcohol");
        });

        var item = filteredFoods.length > 0 ? filteredFoods[0] : data.foods[0];
        displayNutritionalInfo(item);
      } else {
        displayNoDataMessage();
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      displayErrorMessage();
    });
}

function displayNutritionalInfo(item) {
  // Display the retrieved nutritional information in the HTML
  var nutritionalInfoElement = document.getElementById('nutritionalInfo');
  nutritionalInfoElement.innerHTML = `
    <h2>Nutritional Information</h2>
    <p>Item: ${item.description}</p>
    <p>Calories: ${getNutrientValue(item, "Energy")}</p>
    <p>Total Fat: ${getNutrientValue(item, "Total lipid (fat)")}</p>
    <p>Total Carbohydrate: ${getNutrientValue(item, "Carbohydrate, by difference")}</p>
    <p>Protein: ${getNutrientValue(item, "Protein")}</p>
  `;
}

function getNutrientValue(item, nutrientName) {
  const nutrient = item.foodNutrients.find(nutrient => nutrient.nutrientName === nutrientName);
  return nutrient ? `${nutrient.value} ${nutrient.unitName}` : 'Not available';
}

function displayNoDataMessage() {
  // Display a message indicating that no nutritional data is available
  var nutritionalInfoElement = document.getElementById('nutritionalInfo');
  nutritionalInfoElement.innerHTML = '<p>No nutritional data available for this BMI category.</p>';
}

function displayErrorMessage() {
  // Display a message indicating that an error occurred while fetching data
  var nutritionalInfoElement = document.getElementById('nutritionalInfo');
  nutritionalInfoElement.innerHTML = '<p>Error fetching nutritional data. Please try again later.</p>';
}
