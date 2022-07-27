import {Col} from "react-bootstrap";

export const ProjectCard = ({title, description, imgUrl,isDL}) => {
    return (
        <Col size={12} sm={6} md={6}>
            <div className="proj-imgbx">
                <img src={"data:image/Jpeg;base64,".concat(imgUrl)}/>
                <div className="proj-txtx">
                    <h4>{title}</h4>
                    <span>{description}</span>
                </div>
            </div>
        </Col>
    )
}
