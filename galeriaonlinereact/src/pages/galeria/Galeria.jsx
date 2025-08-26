
import './Galeria.css'
import icon from '../../assets/img/upload.svg'
import { Botao } from '../../componentes/botao/Botao'
import { Card } from '../../componentes/card/Card'
import { useEffect, useState } from 'react'
import api from '../../Services/services'

import Swal from 'sweetalert2'


export const Galeria = () => {

    const [cards, setCards] = useState([]);
    const [imagem, setImagem] = useState();
    const [nomeImagem, setNomeImagem] = useState("");

    async function listarCards() {
        // alert("Listouuuu")
        try {
            const resposta = await api.get("Imagem")
            setCards(resposta.data);

        } catch (error) {
            console.error(error);
            // alert("erro ao listar")

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Erro ao listar!",
                footer: ''
            });
        }
    }

    async function cadastrarCard(e) {
        e.preventDefault();
        if (imagem && nomeImagem) {
            try {
                const formData = new FormData();
                formData.append("Nome", nomeImagem)
                formData.append("Arquivo", imagem)

                await api.post("Imagem/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                Swal.fire({
                    title: "Ebaaa, Cadastrou!🎉",
                    icon: "success",
                    draggable: true
                });

            } catch (error) {

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Erro ao Cadastrar",
                    footer: '',
                    confirmButtonColor: "#041a30ff"

                });

            }
        } else {
            // alert("Preecha o campo de nome da imagem!")

            Swal.fire({
                icon: "warning",
                title: "Campos obrigatórios!",
                text: "Preencha o nome e selecione uma imagem antes de cadastrar.",
                confirmButtonText: "Entendido",
                confirmButtonColor: "#041a30ff"
            });

        }
    }

    
     function editarCard(id, nomeAntigo) {
        const novoNome = prompt("Digite o novo nome da imagem:", nomeAntigo);

        const inputArquivo = document.createElement("input");
        inputArquivo.type = "file";
        //Aceita imagens independente das extensões
        inputArquivo.accept = "image/*";
        inputArquivo.style = "display: none";
        // <input type="file" accept="image/*"></input>

        // Define o que acontece quando o usuário selecionar um arquivo
        inputArquivo.onchange = async (e) => {
            const novoArquivo = e.target.files[0];

            const formData = new FormData();
            //adicionar o novo nome no formData:
            formData.append("Nome", novoNome);
            formData.append("Arquivo", novoArquivo);

            if (formData) {
                try {
                    await api.put(`Imagem/${id}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })

                    alert("Ebaaa deu certo!😁✨");
                    listarCards();
                } catch (error) {
                    alert("Não foi possível alterar o card!");
                    console.error(error);
                }
            }
        };


        inputArquivo.click();

    }

    async function excluirCard(id) {
        try {
            await api.delete(`Imagem/${id}`)
            Swal.fire({
                title: "Ebaaa, Excluiu!🎉",
                icon: "success",
                draggable: true,
                confirmButtonColor: "#041a30ff"

            });
        } catch (error) {
            // alert("erro")
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Erro ao excluir o card!",
                footer: '',
                confirmButtonColor: "#041a30ff"

            });
        }

    }

    useEffect(() => {
        listarCards()
    })

    return (
        <>
            <h1 className='tituloGaleria'>Galeria Online </h1>

            <form className='Formulario' onSubmit={cadastrarCard}>
                <div className='campoNome'>
                    <label>Nome</label>
                    <input type="text" className='inputNome' onChange={(e) => setNomeImagem(e.target.value)}
                        value={nomeImagem} />
                </div>
                <div className='campoImagem'>
                    <label className='arquivoLabel'>
                        <i><img src={icon} alt="Icocne de upload" /></i>
                        <input type="file" className='arquivoInput' onChange={(e) => setImagem(e.target.files[0])} />
                    </label>
                </div>
                <Botao nomeBotao="Cadastrar" />
            </form>

            <div className='campoCards'>
                {cards.length > 0 ? (
                    cards.map((e) => (
                        <Card tituloCard={e.nome}
                            key={e.id}
                            imgCard={`https://localhost:7273/${e.caminho.replace("wwwroot/", "")}`}
                            funcEditar={() => editarCard(e.id, e.nome)}
                            funcExcluir={() => excluirCard(e.id)} />
                    ))
                ) : <p>Nenhum card cadastrado!</p>
                }

            </div>
        </>
    )


}