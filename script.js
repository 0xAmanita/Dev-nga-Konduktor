// Automated Mintal-Roxas Fare Matrix
// A personal tool I use whenever my father goes on a weekend Mintal-Roxas round trip
// Jeepney Kondoktor fare calculator

document.getElementById("calculateBtn").addEventListener("click", calculateFare);
document.getElementById("discount").addEventListener("click", calculateDiscount);

// Locations (One Way)
// Roxas - Mintal not yet implemented
const locations = [
  { id: "mintal-elem", name: "Mintal Elementary School" },
  { id: "mintal-simbahan", name: "Mintal Catholic Church" },
  { id: "meadows", name: "Green Meadows" },
  { id: "pequeno", name: "Crossing Cat Peq" },
  { id: "dayrit", name: "Pag-Ibig" },
  { id: "reyes", name: "Green Hills" },
  { id: "cals", name: "Bypass Puan" },
  { id: "ulas", name: "Bypass Ulas" },
  { id: "bangkal", name: "Bangkal" },
  { id: "tahimik", name: "Tahimik Avenue" },
  { id: "matina", name: "Matina Crossing" },
  { id: "abscbn", name: "Quimpo (Traffic Lights to SnR)" },
  { id: "sm", name: "SM Ecoland" },
  { id: "ecoland", name: "Ecoland Terminal Crossing" },
  { id: "almendras", name: "Almendras Gym" },
  { id: "roxas", name: "Roxas" },
  { id: "acacia", name: "Acacia" },
  { id: "ddc", name: "Davao Doc" },
  { id: "sandawa", name: "Crossing Sandawa" },
  { id: "maa", name: "Ma-a Crossing" },
  { id: "tulip", name: "Tulip Drive" },
  { id: "sabongan", name: "Matina Sabongan" },
  { id: "matina2", name: "Matina Crossing" },
  { id: "tahimik2", name: "Tahimik Avenue" },
  { id: "bangkal2", name: "Bangkal" },
  { id: "bypass-ulas", name: "Bypass Ulas" },
  { id: "bypass-puan", name: "Bypass Puan" },
  { id: "green-hills", name: "Green Hills" },
  { id: "pag-ibig2", name: "Pag-Ibig" },
  { id: "pequeno2", name: "Crossing Cat Peq" },
  { id: "meadows2", name: "Green Meadows" },
  { id: "mintal-simbahan2", name: "Mintal Catholic Church" },
  { id: "mntal-elem2", name: "Mintal Elementary School" },
];

// Create index map (id → position in route)
const locationIndexMap = {};
locations.forEach((loc, index) => {
  locationIndexMap[loc.id] = index;
});

// DOM
const loc1Select = document.getElementById("loc1");
const loc2Select = document.getElementById("loc2");

// Populate dropdowns
function populateDropdown(selectElement) {
  selectElement.innerHTML = '<option value="">Select location</option>';

  locations.forEach(loc => {
    const option = document.createElement("option");
    option.value = loc.id;
    option.textContent = loc.name;
    selectElement.appendChild(option);
  });
}

// Initialize dropdowns
populateDropdown(loc1Select);
populateDropdown(loc2Select);

// Calculate the fare as per destination
function calculateFare() {
  const loc1 = loc1Select.value;
  const loc2 = loc2Select.value;
  const result = document.getElementById("result");

  if (!loc1 || !loc2) {
    result.textContent = "Please select both locations.";
    return;
  }

  if (loc1 === loc2) {
    result.textContent = "Origin and destination cannot be the same.";
    return;
  }

  const index1 = locationIndexMap[loc1];
  const index2 = locationIndexMap[loc2];

  // Kilometers
  const distance = Math.abs(index1 - index2);

  let fare;
  if (distance <= 3) {
    fare = 14;
  } else {
    fare = 14 + ((distance - 3) * 2);
  }

  result.textContent = `Distance: ${distance} | Fare: ₱${fare}`;
  console.log(`Fare: Php ${fare}`);
  return { distance, fare };
}

// Apply student/senior discount 
function calculateDiscount() {
    const DISCOUNT_RATE = 0.2;

    const data = calculateFare();
    if (!data) return;

    // Calculate Discount
    discountedFare =  Math.ceil(data.fare - (data.fare * DISCOUNT_RATE));
    
    const result = document.getElementById("result");

    // console.log(`Discounted: ${discountedFare}`);

    result.textContent = `Distance: ${data.distance} | Discounted Fare: Php ${discountedFare}`;
}