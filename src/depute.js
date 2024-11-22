import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

// Replicate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    if (isInVoters(pours, id)) return POUR;
    if (isInVoters(contres, id)) return CONTRE;
    if (isInVoters(abstentions, id)) return ABSTENTION;
  }
  return ABSENT;
}

const normalizeName = name => {
  return name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

const writeDeputeData = ({identifiant: id, Prénom: firstName, Nom: lastName}, {scrutin}) => {
  const standing = getStanding(scrutin.ventilationVotes, id);
  console.log(standing);
  const output = {
    firstName,
    lastName,
    votes: [
      {
        title: scrutin.titre,
        standing,
      }
    ]
  }
  const fileName = `${normalizeName(firstName)}_${normalizeName(lastName)}.json`;

  // Define the output folder in the parent directory
  const outputDir = path.join(__dirname, '..', 'output');

  // Ensure the output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(outputDir, fileName);

  // Write the JSON object to the file
  fs.writeFile(filePath, JSON.stringify(output, null, 2), (err) => {
    if (err) {
      console.error('Error writing to file:', err.message);
    } else {
      console.log(`File successfully written to ${filePath}`);
    }
  });
}

export default writeDeputeData;