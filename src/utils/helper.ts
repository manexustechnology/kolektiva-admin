// Helper function to convert image URLs to File objects
export async function urlToFile(url: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], url.split("/").pop() || "image.jpg", {
    type: blob.type,
  });
}

export async function urlsToFiles(urls: string[]): Promise<File[]> {
  return Promise.all(urls.map((url) => urlToFile(url)));
}
