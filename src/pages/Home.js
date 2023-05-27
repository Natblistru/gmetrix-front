import Card from '../components/Card';
import ListDiscipline from '../components/ListDiscipline';
import discipline from '../data/discipline';

const Home = () => {
    return (
        <Card title="Disciplinele de absolvire a cursului gimnazial">
            <ListDiscipline list = {discipline} />
        </Card>
    )
}
export default Home; 