interface AIGenerationImageProps {
  input: string;
  numberOfImagesToBeGenerated: number;
}

export const generateImage = async ({
  input,
  numberOfImagesToBeGenerated,
}: AIGenerationImageProps) => {
  const response = await fetch("/api/generate-image", {
    method: "POST",
    body: JSON.stringify({ prompt: input, n: numberOfImagesToBeGenerated }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return {
      error: response.status,
    };
  }
};
