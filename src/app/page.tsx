import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { MusicWallpaper } from '@/components/MusicWallpaper';
import { Slider } from '@/components/Slider';
import { SpotifySignInButton } from '@/components/SpotifySignInButton';

import SAMPLE_TRACKS from '../lib/sampleTracks.json';

import { authConfig } from '@/lib/auth';
import { TrackProps } from '@/services/http/topTrack/types';
const words = ['Artfy', 'Exclusiva'];
const descriptions = [
  'Artfy transforma suas músicas mais ouvidas em wallpapers aesthetics',
  'O site analisa seu perfil musical e cria uma arte exclusiva, que reflete seu gosto e humor'
];

export default async function Page() {
  const session = await getServerSession(authConfig);

  if (session) return redirect('/wallpaper');

  const items: unknown = SAMPLE_TRACKS.items;
  const convertedItems: TrackProps[] = items as TrackProps[];

  return (
    <div>
      <div className="mx-auto">
        <Slider words={words} descriptions={descriptions} />
      </div>
      <div className="flex flex-col items-center p-6 mx-auto">
        <SpotifySignInButton />
        {convertedItems && <MusicWallpaper tracks={convertedItems} />}
      </div>
    </div>
  );
}
