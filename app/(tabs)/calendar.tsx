// Import the View component from react-native
import { View } from 'react-native';
// Import the Calendar component from react-native-calendars
import { Calendar } from 'react-native-calendars';

// Define a functional component called MyCalendar
const MyCalendar = () => {
    return (
        // Render a View container
        <View>
            {/* Render the Calendar component */}
            <Calendar
                // Mark specific dates with different styles and properties
                markedDates={{
                    '2023-06-25': { selected: true, marked: true }, // Selected and marked date
                    '2023-06-24': { marked: true }, // Only marked date
                    '2023-06-26': {
                        marked: true, // Marked date
                        dotColor: 'red', // Dot color for this date
                        activeOpacity: 0 // Opacity when pressed
                    },
                }}
                // Customize the appearance of the calendar using the theme prop
                theme={{
                    backgroundColor: '#ffffff', // Overall background color
                    calendarBackground: '#ffffff', // Calendar background color
                    textSectionTitleColor: '#b6c1cd', // Color for section titles (weekdays)
                    selectedDayBackgroundColor: '#00adf5', // Background color for selected day
                    selectedDayTextColor: '#ffffff', // Text color for selected day
                    todayTextColor: '#00adf5', // Text color for today's date
                    dayTextColor: '#2d4150', // Default day text color
                    textDisabledColor: '#d9e1e8', // Color for disabled days
                    dotColor: '#00adf5', // Default dot color
                    selectedDotColor: '#ffffff', // Dot color for selected day
                    arrowColor: '#00adf5', // Color for navigation arrows
                    monthTextColor: '#00adf5', // Color for month text
                    indicatorColor: 'blue', // Color for loading indicator
                    textDayFontFamily: 'monospace', // Font family for day numbers
                    textMonthFontFamily: 'monospace', // Font family for month text
                    textDayHeaderFontFamily: 'monospace', // Font family for day headers
                    textDayFontSize: 16, // Font size for day numbers
                    textMonthFontSize: 16, // Font size for month text
                    textDayHeaderFontSize: 16 // Font size for day headers
                }}
            />
        </View>
    );
};

// Export the main App component as default
export default function App() {
    return (
        // Render a View container with flex layout and center alignment
        <View style={{ 
            flex: 1, // Take up the full screen
            justifyContent: 'center', // Center content vertically
            alignItems: 'center' // Center content horizontally
        }}>
            {/* Render the custom MyCalendar component */}
            <MyCalendar />
        </View>
    );
}