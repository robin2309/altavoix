const Votes = ({ votes }) => {
    const {pour, absent, abstention, contre} = votes;
    
    return (
      <>
        <h3 className="text-lg font-bold mb-4">Votes aux scrutins de l'Assemblée Nationale</h3>
        <pre className="whitespace-pre-wrap overflow-auto">
          {JSON.stringify(votes, null, 2)}
        </pre>
      </>
    );
}

export default Votes;
