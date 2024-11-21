// generate json file in output/ firstname_lastname.json
/**
 * {
    *  firstName
    *  lastName
    *  votes [
    *      {
    *           title
    *           standing: POUR / CONTRE / ABSENT / ABSTENTION
    * }
    *  ]
 * }
 */
// lookup vote in scrutin.ventilationVotes.organe.groupes.groupe[].vote.decompteNominatif.(pours / contres / abstentions).votant[].acteurRef

const POUR = 'pour';
const CONTRE = 'contre';
const ABSTENTION = 'abstention';
const ABSENT = 'absent';

const isInVoters = (votes, id) => {
  if (!votes) return false;
  const normalizedId = `PA${id}`;
  if (!!(votes?.votant?.acteurRef)) {
    return normalizedId === votes.votant.acteurRef;
  }
  return votes ? votes.votant.find(({acteurRef}) => {
    return normalizedId === acteurRef;
  }) : false;
};

const getStanding = (votes, id) => {
  const {groupe: groups} = votes.organe.groupes;
  for (let group of groups) {
    const {pours, contres, abstentions} = group.vote.decompteNominatif;
    if (isInVoters(pours)) return POUR;
    if (isInVoters(contres)) return CONTRE;
    if (isInVoters(abstentions)) return ABSTENTION;
  }
  return ABSENT;
}

const writeDeputeData = ({identifiant: id, Prénom: firstName, Nom: lastName}, {scrutin}) => {
  const standing = getStanding(scrutin.ventilationVotes);
  console.log(standing);
  const output = {
    firstName,
    lastName,
    votes: [
      {
        title: scrutin.titre,
      }
    ]
  }
  // console.log({id, firstName, lastName});
}

export default writeDeputeData;