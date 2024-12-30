export namespace Helpers {
  export function helloWorld() {
    console.log('Hello World');
  }
}


export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  // Parse the input string into a Date object
  const date = new Date(dateString);

  // Format the date using toLocaleDateString
  return date.toLocaleDateString(undefined, options); // Default locale
}


