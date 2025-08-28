// Import necessary hooks and components from React and React Native
import { useRef, useState } from 'react';
import {
    StyleSheet, // Container component for layout
    Text, // For creating styles
    TouchableOpacity // For creating touchable buttons
    ,
    View
} from 'react-native';

// Main App component
const App = () => {

    // State to keep track of elapsed time in seconds
    const [time, setTime] = useState(0);

    // State to keep track of whether the stopwatch is running
    const [running, setRunning] = useState(false);

    // Ref to store the interval ID for clearing it later
    const intervalRef = useRef(null);

    // Ref to store the start time (in ms) for accurate time calculation
    const startTimeRef = useRef(0);

    // Function to start the stopwatch
    const startStopwatch = () => {
        
        // Set the start time, accounting for any previously elapsed time
        startTimeRef.current = Date.now() - time * 1000;
        
        // Start interval to update time every second
        intervalRef.current = setInterval(() => {
            
            // Update time state with elapsed seconds
            setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }, 1000);
        
        // Set running state to true
        setRunning(true);
    };

    // Function to pause the stopwatch
    const pauseStopwatch = () => {
        
        // Clear the interval to stop updating time
        clearInterval(intervalRef.current);
        
        // Set running state to false
        setRunning(false);
    };

    // Function to reset the stopwatch
    const resetStopwatch = () => {
        
        // Clear the interval
        clearInterval(intervalRef.current);
        
        // Reset time to 0
        setTime(0);
        
        // Set running state to false
        setRunning(false);
    };

    // Function to resume the stopwatch from paused state
    const resumeStopwatch = () => {
        
        // Set the start time to account for already elapsed time
        startTimeRef.current = Date.now() - time * 1000;
        
        // Start interval to update time every second
        intervalRef.current = setInterval(() => {
            
            // Update time state with elapsed seconds
            setTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }, 1000);
        
        // Set running state to true
        setRunning(true);
    };

    // Render UI
    return (
        <View style={styles.container}>
            {/* App Title */}
            <Text style={styles.header}>
                GlideSoft
            </Text>
            
            {/* Sub-title */}
            <Text style={styles.subHeader}>
                Stop Watch In Native
            </Text>
            
            {/* Display elapsed time */}
            <Text style={styles.timeText}>{time}s</Text>
            
            {/* Button container */}
            <View style={styles.buttonContainer}>
                
                {/* If stopwatch is running, show Pause button */}
                {running ? (
                    <TouchableOpacity
                        style={[styles.button, styles.pauseButton]}
                        onPress={pauseStopwatch}
                    >
                        <Text style={styles.buttonText}>Pause</Text>
                    </TouchableOpacity>
                ) : (
                
                    // If not running, show Start and Reset buttons
                    <>
                        <TouchableOpacity
                            style={[styles.button, styles.startButton]}
                            onPress={startStopwatch}
                        >
                            <Text style={styles.buttonText}>Start</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.resetButton]}
                            onPress={resetStopwatch}
                        >
                            <Text style={styles.buttonText}>
                                Reset
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
                
                {/* If not running, show Resume button */}
                {!running && (
                    <TouchableOpacity
                        style={[styles.button, styles.resumeButton]}
                        onPress={resumeStopwatch}
                    >
                        <Text style={styles.buttonText}>Resume</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

// Styles for the components
const styles = StyleSheet.create({
    container: {
        flex: 1,                    // Take up full screen
        justifyContent: 'center',   // Center vertically
        alignItems: 'center',       // Center horizontally
    },
    header: {
        fontSize: 30,               // Large font size
        color: "green",             // Green color
        marginBottom: 10,           // Space below
    },
    subHeader: {
        fontSize: 18,               // Medium font size
        marginBottom: 10,           // Space below
        color: "blue",              // Blue color
    },
    timeText: {
        fontSize: 48, 
        color: 'white'              // Very large font for time
    },
    buttonContainer: {
        flexDirection: 'row',       // Arrange buttons in a row
        marginTop: 20,              // Space above
    },
    button: {
        paddingVertical: 10,        // Vertical padding
        paddingHorizontal: 20,      // Horizontal padding
        borderRadius: 5,            // Rounded corners
    },
    startButton: {
        backgroundColor: '#2ecc71', // Green background
        marginRight: 10,            // Space to the right
    },
    resetButton: {
        backgroundColor: '#e74c3c', // Red background
        marginRight: 10,            // Space to the right
    },
    pauseButton: {
        backgroundColor: '#f39c12', // Orange background
    },
    resumeButton: {
        backgroundColor: '#3498db', // Blue background
    },
    buttonText: {
        color: 'white',             // White text
        fontSize: 16,               // Medium font size
        textAlign: "center",
        fontFamily: ""

    },

});

// Export the App component as default
export default App;