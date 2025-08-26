import './Card.css'
// import imgCard from "../../assets/img/salsicha.jpg"
import imgPen from "../../assets/img/lapis.svg"
import imgTrash from "../../assets/img/lixo.svg"

export const Card = ({tituloCard, imgCard, funcEditar, funcExcluir}) =>{
return(
    <>
    <div className='cardDaImagem'>
        <p>{tituloCard}</p>
        <img className="imgDoCard" src={imgCard} alt="Imagem do card" />
        <div className="icons">
            <img src={imgPen} alt="Icone de lapis" onClick={funcEditar}/>
            <img src={imgTrash} alt="Icone de uma lixeira para deletar" onClick={funcExcluir} />
        </div>
    </div>
    </>
)
}