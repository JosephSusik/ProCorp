import { useNavigate } from "react-router-dom";

function GoBackButton({className}:{className:string}) {
    const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}

    return(
        <div className={className}>
            <button onClick={goBack}>&lt;</button>
        </div>
    );
}

export default GoBackButton;