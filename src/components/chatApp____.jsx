import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Card, Spin, Image } from 'antd';

function App() {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleVisualize = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8081/visualize', { description });
            setImage(`data:image/png;base64,${response.data.image_base64}`);
        } catch (error) {
            console.error('Error:', error);
            setImage(null);
        }
        setLoading(false);
    };

    return (
        <Card title="Interactive Data Visualization Generator">
            <Input.TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your visualization (e.g., 'a bar chart of sales by region')"
                rows={4}
                style={{ marginBottom: 16 }}
            />
            <Button type="primary" onClick={handleVisualize} loading={loading}>
                Visualize
            </Button>
            {loading && <Spin />}
            {image && <Image src={image} alt="Generated Visualization" />}
        </Card>
    );
}

export default App;