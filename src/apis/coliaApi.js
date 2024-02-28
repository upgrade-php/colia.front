
export default class ColiaApi {

  constructor() {
    this.baseUrl = 'https://colia.api.tarefasautomatizadas.com';
  }

  async postData(url = "", data = {}) {
    const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
 }
  
  
  async book(book_name, query) {

    if(process.env.NODE_ENV == 'development'){
      let tmp = {}
      tmp["response"] = `A tecnologia pode ser uma ferramenta poderosa para auxiliar na mudança e no monitoramento de novos hábitos, oferecendo uma variedade de maneiras para tornar os bons hábitos mais fáceis de adotar e manter, e os maus hábitos mais difíceis de seguir. Aqui estão algumas maneiras específicas pelas quais a tecnologia pode ajudar nesse processo:\n\n1. **Rastreamento de Hábitos**: Existem diversos aplicativos projetados para ajudar os usuários a monitorar seus hábitos. Esses aplicativos permitem que você estabeleça metas específicas, acompanhe seu progresso diário e visualize seu histórico de desempenho, o que pode aumentar a motivação e a consistência.\n\n2. **Lembretes e Alertas**: A tecnologia pode ser usada para configurar lembretes e alertas que incentivam a prática de um novo hábito. Isso ajuda a tornar o hábito mais óbvio e diminui a chance de esquecimento, especialmente nos estágios iniciais de formação do hábito.\n\n3. **Empacotamento de Tentações**: Esta estratégia envolve o emparelhamento de uma atividade desejada (mas que precisa de um empurrão para ser realizada) com uma atividade prazerosa, tornando o hábito desejado mais atraente. Por exemplo, vincular o exercício físico ao assistir a episódios de uma série favorita apenas quando estiver na academia ou em uma bicicleta ergométrica.\n\n4. **Dispositivos de Compromisso**: A tecnologia pode ser utilizada para criar dispositivos de compromisso que tornam mais difícil engajar-se em maus hábitos ou que automatizam os bons. Por exemplo, aplicativos que bloqueiam o acesso às redes sociais em determinados períodos para aumentar a produtividade ou configurar investimentos automáticos para economizar dinheiro.\n\n5. **Feedback Instantâneo**: Muitos dispositivos e aplicativos de saúde, como os fitness trackers, fornecem feedback instantâneo sobre a atividade física, sono e outros comportamentos relacionados à saúde. Esse feedback imediato pode incentivar os usuários a manterem-se em seus novos hábitos saudáveis.\n\n6. **Comunidades Online**: Plataformas e aplicativos podem conectar pessoas com objetivos similares, proporcionando suporte social, encorajamento e compartilhamento de dicas e sucessos. Esse senso de comunidade pode ser muito motivador.\n\n7. **Automatização de Hábitos**: A tecnologia pode ser usada para automatizar certos comportamentos, como lembretes para beber água, programar exercícios físicos ou até mesmo preparar refeições saudáveis. Isso pode ajudar a tornar a prática de bons hábitos uma parte natural da rotina diária.\n\nAo utilizar essas estratégias tecnológicas, é possível criar um ambiente que favoreça a adoção de novos hábitos saudáveis e a eliminação de hábitos prejudiciais, facilitando assim a mudança de comportamento a longo prazo.`
      return tmp
    }

    const response = await this.postData(this.baseUrl+'/book', {
      'query': query,
      'book_name': book_name
    })
    return response
  }

}
