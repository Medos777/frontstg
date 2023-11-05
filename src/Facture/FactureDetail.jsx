import React, {useEffect, useState} from 'react';
import { FactureSelected } from './GetFacutreByEtudiant';
import './facture.css';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import EtudiantService from "../services/etudiant.service";

const FactureDetail = () => {
    const [etudiant, setEtudiant] = useState({});

    useEffect(() => {
        async function fetchEtudiant() {
            try {
                const response = await EtudiantService.getAll();
                const filteredEtudiant = response.data.find(etudiant => etudiant._id === facture.etudiant);
                sessionStorage.setItem("nom",filteredEtudiant.nom);
                 sessionStorage.setItem("classe",filteredEtudiant.classe.name);
                if (typeof filteredEtudiant === 'object') {
                    setEtudiant(<React.Fragment>{filteredEtudiant.nom}</React.Fragment>);
                } else {
                    setEtudiant(filteredEtudiant);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchEtudiant();
    }, []);

    const stringifiedObject = sessionStorage.getItem('Facture');
    const facture = JSON.parse(stringifiedObject);
    console.log(facture);

    // Check if the facture object is null
    if (!facture) {
        // Return a loading indicator or something similar
        return <div>Loading...</div>;
    }
    const formattedDate = new Date(facture.date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    const handlePrint = () => {
        // Get the HTML of the invoice template
        const invoiceElement = document.querySelector('.card');

        // Make sure that the elements are not hidden
        invoiceElement.querySelectorAll('p').forEach((element) => {
            element.style.display = 'block';
        });

        // Convert the HTML to a canvas element
        html2canvas(invoiceElement).then((canvas) => {
            let imgWidth = 290;
            let imgHeigth = (canvas.height * imgWidth / canvas.width)
            const contentDataURL =canvas.toDataURL('image/png')
            let pdf = new jspdf('l','mm','a4');
            var positon= 20;
            pdf.addImage(contentDataURL,'PBG',0,positon,imgWidth,imgHeigth);
            pdf.save('facture.pdf');
        });
    };
    const nom= sessionStorage.getItem("nom");
    const classe= sessionStorage.getItem("classe");
    console.log(classe);
    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Facture</h3>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <p><strong>Facture Number:</strong> {facture._id}</p>
                        <p><strong>Date:</strong> {formattedDate}</p>
                        <p><strong>Etudiant:</strong> {nom}</p>
                        <p><strong>Classe:</strong> {classe}</p>
                        <p><strong>Filiere:</strong> {facture.filiere}</p>
                        <p><strong>Niveau:</strong> {facture.niveau}</p>
                    </div>
                    <div className="col-md-6 text-right">
                        <p><strong>Frais d'inscription:</strong> {facture.fraisInscription}</p>
                        <p><strong>Frais de scolarité:</strong> {facture.fraisScolarite}</p>
                        <p><strong>Total:</strong> {facture.total}</p>
                    </div>
                </div>
                <br/>
               <div className="col-12= ">
                   <div className="signature">
                       <p><strong>Signature et Cachet</strong>          </p>
                   </div>
                <div className="col-md-6 ">
                    <p><strong>Paiement:</strong> {facture.paiement}</p>
                    <p><strong>Date de paiement:</strong> {formattedDate}</p>
                    <p><strong>Mode de paiement:</strong></p>
                    <input type="radio" name="mode_paiement" value="Espece" /> Espèce
                    <br/>
                    <input type="radio" name="mode_paiement" value="Virement" /> Virement
                    <br/>
                    <input type="radio" name="mode_paiement" value="Cheque " /> Chèque N:..........

                </div>
                   <br/>
                   <br/>

            </div>
                <div className="col-12">
                    <button className="btn btn-primary" onClick={handlePrint}>Download PDF</button>

                </div>
            </div>
        </div>

    );
};

export default FactureDetail;
