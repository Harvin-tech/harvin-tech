export namespace Helpers {
  export function helloWorld() {
    console.log('Hello World');
  }
}

export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  // Parse the input string into a Date object
  const date = new Date(dateString);

  // Format the date using toLocaleDateString
  return date.toLocaleDateString(undefined, options); // Default locale
}

// Helper function to generate a random string
export function generateRandomString(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}
