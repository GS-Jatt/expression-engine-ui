import { useState } from "react";
import { Form, Button, Row, Col, Dropdown } from "react-bootstrap";

function RuleForm({ onSubmit }) {
    const [connectorType, setConnectorType] = useState("AND");
    const [expressions, setExpressions] = useState([
        { key: "Age", operator: ">", value:0, score:0 },
    ]);

    const handleConnectorTypeChange = (e) => {
        setConnectorType(e.target.value);
    };

    const handleExpressionChange = (index, field, value) => {
        const updatedExpressions = [...expressions];
        updatedExpressions[index][field] = value;
        setExpressions(updatedExpressions);
    };

    const handleAddExpression = () => {
        setExpressions([
            ...expressions,
            { key: "Age", operator: ">", value:0 , score:0 },
        ]);
    };

    const handleDeleteExpression = (index) => {
        const updatedExpressions = [...expressions];
        updatedExpressions.splice(index, 1);
        setExpressions(updatedExpressions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const rules = expressions.map((exp)=> {
            return {key:exp.key,output:{value:exp.value,operator:exp.operator,score:exp.score}}})
        onSubmit({ combinator: connectorType, rules });
    };

    return (
        <Form onSubmit={handleSubmit} className="pt-5">
            <Form.Group controlId="connectorType">
                <Form.Label>Connector Type</Form.Label>
                <Form.Control
                    as="select"
                    value={connectorType}
                    onChange={handleConnectorTypeChange}>
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                </Form.Control>
            </Form.Group>

            <Form.Label className="mt-5 pb-3">Expressions</Form.Label>
            {expressions.map((expression, index) => (
                <Row key={index} className="mb-4">
                    <Col>
                        <Form.Group controlId={`key-${index}`}>
                            <Form.Label>Rule Type</Form.Label>
                            <Dropdown
                                onSelect={(selectedKey) =>
                                    handleExpressionChange(
                                        index,
                                        "key",
                                        selectedKey
                                    )
                                }>
                                <Dropdown.Toggle
                                    variant="outline-secondary"
                                    id={`dropdown-key-${index}`}>
                                    {expression.key}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="Age">
                                        Age
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="Credit Score">
                                        Credit Score
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="Account Balance">
                                        Account Balance
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={`operator-${index}`}>
                            <Form.Label>Operator</Form.Label>
                            <Dropdown
                                onSelect={(selectedKey) =>
                                    handleExpressionChange(
                                        index,
                                        "operator",
                                        selectedKey
                                    )
                                }>
                                <Dropdown.Toggle
                                    variant="outline-secondary"
                                    id={`dropdown-key-${index}`}>
                                    {expression.operator}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item eventKey="<">
                                        {`<`}
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey=">">
                                        {`>`}
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="=">
                                        =
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="<=">
                                        {`<=`}
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey=">=">
                                        {`>=`}
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={`value-${index}`}>
                            <Form.Label>Value</Form.Label>
                            <Form.Control
                                type="number"
                                value={expression.value}
                                onChange={(e) =>
                                    handleExpressionChange(
                                        index,
                                        "value",
                                        +e.target.value
                                    )
                                }
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId={`score-${index}`}>
                            <Form.Label>Score</Form.Label>
                            <Form.Control
                                type="number"
                                value={expression.score}
                                onChange={(e) =>
                                    handleExpressionChange(
                                        index,
                                        "score",
                                        +e.target.value
                                    )
                                }
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Button
                            style={{ marginTop: "32px" }}
                            variant="outline-danger"
                            onClick={() => handleDeleteExpression(index)}>
                            Delete
                        </Button>
                    </Col>
                </Row>
            ))}
            <div className="d-flex justify-content-end gap-5 mt-5">
                <Button
                    variant="outline-primary"
                    className="mt-3 mx-5 px-"
                    onClick={handleAddExpression}>
                    Add Expression
                </Button>

                <Button variant="primary" type="submit" className="mt-3 ">
                    Submit
                </Button>
            </div>
        </Form>
    );
}

export default RuleForm;
