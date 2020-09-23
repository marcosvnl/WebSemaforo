var objetoSemaforo = new Object();
objetoSemaforo.divVerde = "#verde";
objetoSemaforo.divAmarelo = "#amarelo";
objetoSemaforo.divVermelho = "#vermelho";
objetoSemaforo.labelTimeSemaforo = "#timeSemaforo";
objetoSemaforo.labeltimeSemaforoPedestres = "#timeSemaforoPedestres";
/*Temporizador do semafóro*/
objetoSemaforo.tempo = 0;
objetoSemaforo.timeSetControl = "";
/*
 1 verde
 2 amarelo
 3 vermelho
 */
objetoSemaforo.EstagioSemaforo = 1;
objetoSemaforo.MontaEstagioSemaforo = function () {
    // ações do semaforo
    switch (objetoSemaforo.EstagioSemaforo) {
        case 1:
        default:
            objetoSemaforo.RemoveClasse();
            $(objetoSemaforo.divVerde).addClass("semaforoVerdeLigado");
            objetoSemaforo.EstagioSemaforo = 2; // pssando para a proxima cor
            setTimeout(objetoSemaforo.MontaEstagioSemaforo, 10000); // 10 segundo == 10000ms
            clearTimeout(objetoSemaforo.timeSetControl); //Limpar o tempo do setTimeout
            break;
        case 2:
            objetoSemaforo.RemoveClasse();
            $(objetoSemaforo.divAmarelo).addClass("semaforoAmareloLigado");
            objetoSemaforo.EstagioSemaforo = 3; // chama a função
            setTimeout(objetoSemaforo.MontaEstagioSemaforo, 5000); // 5 segundos == 5000ms
            clearTimeout(objetoSemaforo.timeSetControl);
            break;
        case 3:
            objetoSemaforo.RemoveClasse();
            $(objetoSemaforo.divVermelho).addClass("semaforoVermelhoLigado");
            objetoSemaforo.EstagioSemaforo = 1;
            setTimeout(objetoSemaforo.MontaEstagioSemaforo, 10000);
            clearTimeout(objetoSemaforo.timeSetControl);
            break;
    }
    // chando a função objetoSemaforo.IniciaTime paea iniciar novamente
    objetoSemaforo.IniciaTime();
}
// criar um método para desligar o semaforo, pois quando aciona pelas cases
// ele sera ligado e sim o método para desligar ele se mantera ligado
objetoSemaforo.RemoveClasse = function () {
    // Remover a classe usando bootstrap
    $(objetoSemaforo.divVerde).removeClass("semaforoVerdeLigado");
    $(objetoSemaforo.divAmarelo).removeClass("semaforoAmareloLigado");
    $(objetoSemaforo.divVermelho).removeClass("semaforoVermelhoLigado");
}
objetoSemaforo.IniciaTime = function () {
    if (objetoSemaforo.EstagioSemaforo == 2) {
        if (objetoSemaforo.tempo == 0) {
            objetoSemaforo.tempo = 15;
        }
    }
    if (objetoSemaforo.EstagioSemaforo == 1 && objetoSemaforo.tempo == 0) {
        objetoSemaforo.tempo = 10;
    }
    if (objetoSemaforo.tempo >= 0) {
        objetoSemaforo.tempo--;
    }
    if (objetoSemaforo.EstagioSemaforo >= 2) {
        $(objetoSemaforo.labeltimeSemaforoPedestres).text("PARE");
        $(objetoSemaforo.labelTimeSemaforo).text(objetoSemaforo.tempo);
        // o tempo chegar a 0 o label id="timeSemaforoPedestres" rescebe a classe css .classePare
        $(objetoSemaforo.labelTimeSemaforo).addClass("classePare");
    }
    if (objetoSemaforo.EstagioSemaforo == 1) {
        $(objetoSemaforo.labelTimeSemaforo).text("PARE");
        $(objetoSemaforo.labeltimeSemaforoPedestres).text(objetoSemaforo.tempo);
        // o tempo chegar a 0 o label id="timeSemaforoPedestres" rescebe a classe css .classePare
        $(objetoSemaforo.labeltimeSemaforoPedestres).addClass("classePare");
    }
    // Verificar a contagem do objetoSemaforo.IniciaTime
    objetoSemaforo.timeSetControl = setTimeout(objetoSemaforo.IniciaTime, 1000); // Verificar tempo de 1 em 1 segundo
}
$(function () {
    objetoSemaforo.MontaEstagioSemaforo()
});