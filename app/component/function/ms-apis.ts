import { PublicClientApplication, AccountInfo, AuthenticationResult } from "@azure/msal-browser";
import { loginRequest } from "./authConfig"; // Assuming you have an authConfig.ts file

const msalInstance = new PublicClientApplication(loginRequest);

async function login(): Promise<AccountInfo | null> {
  try {
    await msalInstance.initialize();
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      // User is already logged in
      return accounts[0];
    } else {
      // User needs to login
      const response: AuthenticationResult = await msalInstance.loginPopup({
        ...loginRequest,
        scopes: ["openid", "profile", "email"],
      });
      return response.account;
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

interface CalendarEvent {
  start: {
    dateTime: string;
  };
  // Define other properties of a calendar event as needed
}

async function displayCalendarEvents(selectedDate: string): Promise<CalendarEvent[]> {
  try {
    const account = await login();
    if (!account) throw new Error("No account found");

    const accessTokenResponse = await msalInstance.acquireTokenSilent({
      scopes: ["Calendars.Read"],
      account: account,
    });

    const events = await fetchCalendarEvents(accessTokenResponse.accessToken, selectedDate);

    // Sort events by start date
    events.sort((a, b) => new Date(a.start.dateTime).getTime() - new Date(b.start.dateTime).getTime());

    return events;
  } catch (error) {
    console.error("Error displaying calendar events:", error);
    throw error;
  }
}

async function fetchCalendarEvents(accessToken: string, selectedDate: string): Promise<CalendarEvent[]> {
  const selectedDateMidnight = new Date(selectedDate);
  selectedDateMidnight.setDate(selectedDateMidnight.getDate() + 1);
  selectedDateMidnight.setHours(0, 0, 0, 0);

  console.log("Fetching calendar events for date:", selectedDate);
  const selectedDateMidnightISO = selectedDateMidnight.toISOString();
  console.log("Selected date midnight:", selectedDateMidnightISO);

  try {
    const response = await fetch(`https://graph.microsoft.com/v1.0/me/calendar/calendarView?startDateTime=${selectedDate}&endDateTime=${selectedDateMidnightISO}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.error(response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error("Calendar events fetch error:", error);
    throw error;
  }
}

export { displayCalendarEvents };
