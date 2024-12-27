const GEOAPIFY_API_KEY = "1603867bc55344ff97dad74cb8e5634f"; // Replace with your API key


const fetchCurrentTimezone = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      document.getElementById("current-lat").textContent = latitude;
      document.getElementById("current-lon").textContent = longitude;

      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${GEOAPIFY_API_KEY}`
      );
      const data = await response.json();

      if (data.features.length) {
        const timezone = data.features[0].properties;
        document.getElementById("current-name").textContent = timezone.timezone.name || "N/A";
        document.getElementById("current-offset-std").textContent = timezone.timezone.offset_STD || "N/A";
        document.getElementById("current-offset-dst").textContent = timezone.timezone.offset_DST || "N/A";
        document.getElementById("current-country").textContent = timezone.country || "N/A";
        document.getElementById("current-city").textContent = timezone.city || "N/A";
        document.getElementById("current-postcode").textContent = timezone.postcode || "N/A";
      }
    });
  };
  const fetchTimezoneByAddress = async () => {
    const address = document.getElementById("address").value;
    const errorMessage = document.getElementById("error-message");
    const resultSection = document.getElementById("address-timezone");

    if (!address.trim()) {
      errorMessage.classList.remove("hidden");
      resultSection.classList.add("hidden");
      return;
    }

    errorMessage.classList.add("hidden");
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        address
      )}&apiKey=${GEOAPIFY_API_KEY}`
    );
    const data = await response.json();

    if (data.features.length) {
      const timezone = data.features[0].properties;
      document.getElementById("address-name").textContent = timezone.timezone.name || "N/A";
      document.getElementById("address-lat").textContent = timezone.lat || "N/A";
      document.getElementById("address-lon").textContent = timezone.lon || "N/A";
      document.getElementById("address-offset-std").textContent = timezone.timezone.offset_STD || "N/A";
      document.getElementById("address-offset-dst").textContent = timezone.timezone.offset_DST || "N/A";
      document.getElementById("address-country").textContent = timezone.country || "N/A";
      document.getElementById("address-city").textContent = timezone.city || "N/A";
      document.getElementById("address-postcode").textContent = timezone.postcode || "N/A";
      resultSection.classList.remove("hidden");
    } else {
      errorMessage.textContent = "Timezone could not be found.";
      errorMessage.classList.remove("hidden");
      resultSection.classList.add("hidden");
    }
  };
  document.getElementById("fetch-timezone-btn").addEventListener("click", fetchTimezoneByAddress);

      fetchCurrentTimezone();