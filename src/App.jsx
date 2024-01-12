import "./App.css";
import RuleForm from "./ui/Form";

function App() {
    const handleSubmit = (formData) => {
        // submission logic here
      
        console.log("Form submitted with data:",JSON.stringify(formData));
    };

    return (
        <div className="container mt-5 ">
            <RuleForm onSubmit={handleSubmit} />
           
        </div>
    );
}

export default App;
