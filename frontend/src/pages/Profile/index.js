import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setincidents] = useState([]);

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    // serve para disparar alguma função em algum determinado momento do componente
    // por exemplo assim que é mostrado em tela.
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setincidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setincidents(incidents.filter(incident => incident.id !== id));
        }catch(err){
            alert('Erro ao realizar exclusão. Tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        {/* A arrow function abaixo é necessária para passarmos como parâmetro a própria função
                        e não o retorno da função em si. Sem o arrow function a função de delete seria executada assim
                        que o componente carregase em tela, ou seja, todos os incidentes seriam excluídos. */}
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>                    
                ))}
            </ul>
        </div>
    )
}