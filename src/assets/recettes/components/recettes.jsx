import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import RecettesService from '../service/recettesService'
import FetchState from '../../components/FetchState/FetchState'
import './style/style.css'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const recettesService = new RecettesService();

const recettes = () => {
	const params = useParams();
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["meals", params.name],
		queryFn: () => recettesService.RecettesParCategorie(params.name),
	});
	return (
		<Container fluid className='min-vh-100 d-grid'>
			<FetchState isLoading={isLoading} isError={isError} error={error}>
				<Container className=' p-5'>
				<h2 className='text-success pt-5'> Catégorie :  {params.name} </h2>
				<Link to={`/`} className='text-white'>
						<h6 className='text-center py-5'> Retour a la page d'accueil</h6>
				</Link>
					<Row>
						{data && data.map((meals) => (
							<Col className='bg-black text-white border border-secondary rounded-3 m-3 p-3'  key={meals.idMeal} xs={12} sm={6} md={4} lg={3} xl={2}>
                                <Link className='meals-title_link' to={`/meals/${meals.idMeal}`} key={meals.idMeal}>
									<h5 className='text-center my-3'>{meals.strMeal}</h5>
								</Link>
								<img src={meals.strMealThumb} alt="" className='img-thumbnail'/>
							</Col>
						))}
					</Row>
				</Container>
			</FetchState>
		</Container>
	)
}

export default recettes;
