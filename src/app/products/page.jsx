async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
      // ვამატებთ User-Agent-ს, რომ API-მ მოთხოვნა არ დაბლოკოს
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status}`);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch failed entirely:", error);
    return [];
  }
}
