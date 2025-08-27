// Importing necessary hooks from React
import {
    useEffect // Hook for performing side effects in functional components
    ,
    useState
} from "react";

// Importing components and utilities from React Native
import {
    Clipboard, // Component for touchable buttons
    ScrollView, // Component for scrollable views
    StyleSheet, // Container component for layout
    Text, // Component for displaying text
    TextInput, // Component for user input fields
    TouchableOpacity,
    View, // Container component for layout
} from "react-native";

// Importing Icon component from react-native-vector-icons for displaying icons
import Icon from "react-native-vector-icons/FontAwesome";


const App = () => {
    // State variables for managing input fields and password list
    const [website, setWebsite] = useState(""); // State for website input
    const [username, setUsername] = useState(""); // State for username input
    const [password, setPassword] = useState(""); // State for password input
    const [passwords, setPasswords] = useState([]); // State for storing list of passwords
    const [alertVisible, setAlertVisible] = useState(false); // State for showing alert when text is copied
    const [editing, setEditing] = useState(false); // State for tracking if editing mode is active
    const [editIndex, setEditIndex] = useState(null); // State for tracking the index of the password being edited

    // useEffect hook to initialize the password list when the component mounts
    useEffect(() => {
        showPasswords();
    }, []);


    // Function to save or update a password
    const savePassword = () => {
        // Check if any of the input fields is empty
        if (!website || !username || !password) {
            alert("Please fill in all fields."); // Show alert if fields are empty
            return;
        }

        if (editing && editIndex !== null) {
            // If editing, update the existing password
            const updatedPasswords = [...passwords];
            updatedPasswords[editIndex] = {
                website,
                username,
                password,
            };
            setPasswords(updatedPasswords); // Update the password list
            setEditing(false); // Exit editing mode
            setEditIndex(null); // Clear edit index
        } else {
            // If not editing, add a new password
            const newPassword = {
                website,
                username,
                password,
            };
            setPasswords([...passwords, newPassword]); // Add new password to the list
        }
        setWebsite(""); // Reset website input
        setUsername(""); // Reset username input
        setPassword(""); // Reset password input
    };


    // Function to enable editing mode for a specific password
    const editPassword = (index) => {
        setEditing(true); // Enable editing mode
        setEditIndex(index); // Set the index of the password being edited
        setWebsite(passwords[index].website); // Populate website input with existing value
        setUsername(passwords[index].username); // Populate username input with existing value
        setPassword(passwords[index].password); // Populate password input with existing value
    };

    // Function to delete a password by website name
    const deletePassword = (website) => {
        const updatedPasswords = passwords.filter(
            (e) => e.website !== website // Filter out the password with the given website
        );
        setPasswords(updatedPasswords); // Update the password list
        alert(`Successfully deleted ${website}'s password`); // Show success message
    };

    // Function to reset the password list and input fields
    const showPasswords = () => {
        setPasswords([]); // Clear the password list
        setWebsite(""); // Reset website input
        setUsername(""); // Reset username input
        setPassword(""); // Reset password input
        setEditing(false); // Exit editing mode
        setEditIndex(null); // Clear edit index
    };


    // Function to copy text to the clipboard
    const copyText = async (txt) => {
        try {
            Clipboard.setString(txt); // Copy text to clipboard
            setAlertVisible(true); // Show alert
            setTimeout(() => {
                setAlertVisible(false); // Hide alert after 2 seconds
            }, 2000);
        } catch (error) {
            console.error("Error copying text:", error); // Log error if copying fails
        }
    };

    // Function to mask a password with asterisks
    const maskPassword = (pass) => {
        let str = "";
        for (let index = 0; index < pass.length; index++) {
            str += "*";
        }
        return str;
    };


    // Function to render the list of saved passwords
    const renderPasswordList = () => {
        return passwords.map((item, index) => (
            <View style={styles.passwordItem} key={index}>
                {/* Display website */}
                <View style={styles.listItem}>
                    <Text style={styles.listLabel}>
                        Website:
                    </Text>
                    <Text style={styles.listValue}>
                        {item.website + " "}
                    </Text>
                    <TouchableOpacity
                        style={styles.copyIcon}
                        onPress={() => copyText(item.website)}>
                        <Icon
                            name="copy"
                            size={20}
                            color="#555" />
                    </TouchableOpacity>
                </View>

                {/* Display username */}
                <View style={styles.listItem}>
                    <Text style={styles.listLabel}>
                        Username:
                    </Text>
                    <Text style={styles.listValue}>
                        {item.username + " "}
                    </Text>
                    <TouchableOpacity
                        style={styles.copyIcon}
                        onPress={() => copyText(item.username)}>
                        <Icon
                            name="copy"
                            size={20}
                            color="#555" />
                    </TouchableOpacity>
                </View>

                {/* Display masked password */}
                <View style={styles.listItem}>
                    <Text style={styles.listLabel}>
                        Password:
                    </Text>
                    <Text style={styles.listValue}>
                        {maskPassword(item.password)}
                    </Text>
                    <TouchableOpacity
                        style={styles.copyIcon}
                        onPress={() => copyText(item.password)}>
                        <Icon
                            name="copy"
                            size={20}
                            color="#555" />
                    </TouchableOpacity>
                </View>

                {/* Buttons for editing and deleting */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => editPassword(index)}>
                        <Icon
                            name="edit"
                            size={20}
                            color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => deletePassword(item.website)}>
                        <Icon
                            name="trash"
                            size={20}
                            color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        ));
    };

    // Main component rendering
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {/* Heading */}
                <Text style={styles.heading}>
                    Password Manager
                </Text>

                {/* Subheading and alert */}
                <Text style={styles.subHeading}>
                    Your Passwords
                    {alertVisible && (
                        <Text id="alert"> (Copied!)</Text>
                    )}
                </Text>

                {/* Display message if no passwords are available */}
                {passwords.length === 0 ? (
                    <Text style={styles.noData}>
                        No Data To Show
                    </Text>
                ) : (
                    <ScrollView horizontal>
                        <View style={styles.table}>
                            {renderPasswordList()}
                        </View>
                    </ScrollView>
                )}

                {/* Form for adding or editing passwords */}
                <Text style={styles.subHeading}>
                    {editing
                        ? "Edit Password"
                        : "Add a Password"}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Website"
                    value={website}
                    onChangeText={(text) => setWebsite(text)} />

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)} />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)} />

                {/* Button to save or update password */}
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={savePassword}>
                    <Text style={styles.submitButtonText}>
                        {editing
                            ? "Update Password"
                            : "Add Password"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};
// Exporting the main App component as the default export
export default App;

// Defining styles for the application using StyleSheet
const styles = StyleSheet.create({
    // Style for the main container
    container: {
        flex: 1, // Take up the full height of the screen
        margin: 20, // Add margin around the container
    },
    // Style for the content inside the container
    content: {
        margin: 15, // Add margin inside the content
    },
    // Style for the main heading
    heading: {
        fontSize: 30, // Large font size
        fontWeight: "bold", // Bold text
        marginBottom: 15, // Space below the heading
        textAlign: "center", // Center align the text
        color: "#333", // Dark gray color
    },
    // Style for subheadings
    subHeading: {
        fontSize: 23, // Slightly smaller font size than the main heading
        fontWeight: "bold", // Bold text
        marginBottom: 10, // Space below the subheading
        color: "#333", // Dark gray color
    },
    // Style for the "No Data" message
    noData: {
        fontSize: 17, // Medium font size
        fontStyle: "italic", // Italic text
        marginBottom: 20, // Space below the message
        color: "#666", // Light gray color
    },
    // Style for the table containing password items
    table: {
        flexDirection: "row", // Arrange items in a row
        backgroundColor: "white", // White background
        borderRadius: 15, // Rounded corners
        elevation: 4, // Add shadow for Android
        marginBottom: 20, // Space below the table
        shadowColor: "grey", // Shadow color for iOS
        shadowOffset: { width: 0, height: 0 }, // Shadow offset for iOS
        shadowRadius: 5, // Shadow radius for iOS
        shadowOpacity: 1, // Shadow opacity for iOS
    },
    // Style for each password item
    passwordItem: {
        flexDirection: "column", // Arrange items in a column
        alignItems: "center", // Center align items
        borderBottomWidth: 1, // Add a bottom border
        borderBottomColor: "#ddd", // Light gray border color
        padding: 15, // Add padding inside the item
    },
    // Style for each list item (e.g., website, username, password)
    listItem: {
        flexDirection: "row", // Arrange items in a row
        justifyContent: "space-between", // Space out items evenly
        alignItems: "center", // Center align items vertically
        marginRight: 10, // Space to the right of the item
        marginBottom: 10, // Space below the item
    },
    // Style for the label in the list item
    listLabel: {
        fontWeight: "bold", // Bold text
        marginBottom: 5, // Space below the label
        color: "#333", // Dark gray color
        fontSize: 19, // Medium font size
    },
    // Style for the value in the list item
    listValue: {
        flex: 1, // Take up available space
        fontSize: 18, // Medium font size
        color: "#444", // Medium gray color
        paddingLeft: 10, // Space to the left of the value
    },
    // Style for the copy icon in the list item
    copyIcon: {
        marginRight: 10, // Space to the right of the icon
        paddingLeft: 10, // Space to the left of the icon
    },
    // Style for the delete button
    deleteButton: {
        backgroundColor: "red", // Red background
        borderRadius: 4, // Slightly rounded corners
        padding: 5, // Add padding inside the button
        marginLeft: 10, // Space to the left of the button
    },
    // Style for the edit button
    editButton: {
        backgroundColor: "blue", // Blue background
        borderRadius: 4, // Slightly rounded corners
        padding: 5, // Add padding inside the button
        marginRight: 10, // Space to the right of the button
    },
    // Style for the container holding the edit and delete buttons
    buttonsContainer: {
        flexDirection: "row", // Arrange buttons in a row
    },
    // Style for the input fields
    input: {
        borderWidth: 2, // Border width
        borderColor: "#eee", // Light gray border color
        paddingVertical: 10, // Vertical padding inside the input
        paddingHorizontal: 15, // Horizontal padding inside the input
        marginBottom: 20, // Space below the input
        fontSize: 16, // Medium font size
        borderRadius: 10, // Rounded corners
        backgroundColor: "white", // White background
        shadowColor: "grey", // Shadow color for iOS
        shadowOffset: { width: 0, height: 0 }, // Shadow offset for iOS
        shadowRadius: 10, // Shadow radius for iOS
        shadowOpacity: 1, // Shadow opacity for iOS
        elevation: 4, // Add shadow for Android
    },
    // Style for the submit button
    submitButton: {
        backgroundColor: "green", // Green background
        color: "white", // White text color
        fontWeight: "bold", // Bold text
        borderRadius: 10, // Rounded corners
        paddingVertical: 15, // Vertical padding inside the button
        paddingHorizontal: 30, // Horizontal padding inside the button
        shadowColor: "black", // Shadow color for iOS
        shadowOffset: { width: 2, height: 2 }, // Shadow offset for iOS
        shadowRadius: 15, // Shadow radius for iOS
        shadowOpacity: 1, // Shadow opacity for iOS
        elevation: 4, // Add shadow for Android
    },
    // Style for the text inside the submit button
    submitButtonText: {
        color: "white", // White text color
        textAlign: "center", // Center align the text
        fontSize: 18, // Medium font size
    },
});