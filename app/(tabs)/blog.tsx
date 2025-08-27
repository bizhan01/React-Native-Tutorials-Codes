import { useState } from "react";
import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

const data = [
  {
    id: 1,
    title: "React",
    content:
      "ReactJS is a declarative, efficient, and flexible JavaScript library for building user interfaces.",
  },
  {
    id: 2,
    title: "React Native",
    content:
      "It is a framework developed by Facebook for creating native-style apps for iOS & Android.",
  },
];

const App = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState(data);
  const [error, setError] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingContent, setEditingContent] = useState("");

  const addNewPost = () => {
    if (newPostTitle.trim() === "" || newPostContent.trim() === "") {
      setError("Title and content cannot be empty");
      return;
    }
    const id = posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
    const newPost = { id, title: newPostTitle, content: newPostContent };
    setPosts([...posts, newPost]);
    setNewPostTitle("");
    setNewPostContent("");
    setError("");
  };

  const deletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const updatePost = (postId, updatedTitle, updatedContent) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, title: updatedTitle, content: updatedContent }
          : post
      )
    );
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setEditingTitle(post.title);
    setEditingContent(post.content);
    setError("");
  };

  const handleSaveEdit = () => {
    if (editingTitle.trim() === "" || editingContent.trim() === "") {
      setError("Title and content cannot be empty");
      return;
    }
    updatePost(editingPost.id, editingTitle, editingContent);
    setEditingPost(null);
    setEditingTitle("");
    setEditingContent("");
    setError("");
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditingTitle("");
    setEditingContent("");
    setError("");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedPost(item)}>
      <View style={styles.postCard}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent} numberOfLines={2}>
          {item.content}
        </Text>
        <View style={styles.actionRow}>
          <TouchableOpacity onPress={() => handleEdit(item)}>
            <Text style={styles.editText}>✏️ Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deletePost(item.id)}>
            <Text style={styles.deleteText}>🗑 Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80} // adjust if header overlaps
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.headerText}>📘 Blog App</Text>
          </View>

          {!selectedPost && !editingPost && (
            <FlatList
              data={posts}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No posts yet. Add one!</Text>
              }
            />
          )}

          {selectedPost && !editingPost && (
            <View style={styles.detailCard}>
              <Text style={styles.detailTitle}>{selectedPost.title}</Text>
              <Text style={styles.detailContent}>{selectedPost.content}</Text>
              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={() => setSelectedPost(null)}
              >
                <Text style={styles.buttonText}>⬅ Back</Text>
              </TouchableOpacity>
            </View>
          )}

          {editingPost && (
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>✏️ Edit Post</Text>
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <TextInput
                style={styles.input}
                placeholder="Enter Title"
                value={editingTitle}
                onChangeText={setEditingTitle}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter Content"
                value={editingContent}
                onChangeText={setEditingContent}
                multiline
              />
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.buttonPrimary}
                  onPress={handleSaveEdit}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonSecondary}
                  onPress={handleCancelEdit}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {!selectedPost && !editingPost && (
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>➕ Add New Post</Text>
              {error ? <Text style={styles.error}>{error}</Text> : null}
              <TextInput
                style={styles.input}
                placeholder="Enter Title"
                value={newPostTitle}
                onChangeText={setNewPostTitle}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter Content"
                value={newPostContent}
                onChangeText={setNewPostContent}
                multiline
              />
              <TouchableOpacity style={styles.buttonPrimary} onPress={addNewPost}>
                <Text style={styles.buttonText}>Add Post</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 16 },
  header: {
    backgroundColor: "#3498db",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  postCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  postTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  postContent: { fontSize: 14, color: "#444" },

  actionRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 8 },
  editText: { marginRight: 20, color: "#2ecc71", fontWeight: "bold" },
  deleteText: { color: "#e74c3c", fontWeight: "bold" },

  detailCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 3,
  },
  detailTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  detailContent: { fontSize: 16, color: "#444" },

  formCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    elevation: 2,
  },
  formTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },
  textArea: { height: 100, textAlignVertical: "top" },
  error: { color: "#e74c3c", marginBottom: 8, textAlign: "center" },

  buttonPrimary: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 6,
  },
  buttonSecondary: {
    backgroundColor: "#95a5a6",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginLeft: 6,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },

  emptyText: { textAlign: "center", marginTop: 40, fontSize: 16, color: "#888" },
});

export default App;
