import { ShowForm } from '../ShowForm';

export default function NewShowPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Nouveau spectacle</h1>
        <p className="text-gray-400 mt-1">Ajoutez une nouvelle date de tournée</p>
      </div>
      <ShowForm mode="create" />
    </div>
  );
}
