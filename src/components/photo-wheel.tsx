import { Button, Image } from '@nextui-org/react';
import { usePhotoDataContext } from '../data/images';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../utils/routes';

export const PhotoWheel = ({ onComplete }: { onComplete: () => void }) => {
  const navigate = useNavigate();

  const { wheelPhoto, togglePhotoLike, activeSearchData } =
    usePhotoDataContext();

  const [sessionStack, setSessionStack] = useState(() => {
    const results = activeSearchData.results;

    const indexOfWheelPhoto = results.findIndex(
      (res) => res.id === wheelPhoto?.id,
    );

    const firstStackHalf = results.slice(indexOfWheelPhoto);
    const secondStackHalf = results.slice(0, indexOfWheelPhoto);
    const stack = [...firstStackHalf, ...secondStackHalf];
    return stack;
  });

  if (!wheelPhoto) {
    return;
  }

  const stackSubset = sessionStack.slice(0, 3);

  const handleReject = () => {
    setSessionStack(sessionStack.slice(1));
  };

  const handleLike = () => {
    togglePhotoLike(stackSubset[0]);
    setSessionStack(sessionStack.slice(1));
  };

  if (stackSubset.length === 0) {
    return (
      <div className="bg-white rounded-2xl py-4 px-8 space-y-4">
        <span className="text-3xl">👏</span>
        <h2 className="text-2xl font-bold">Great job!</h2>
        <p>
          You have great taste in: {activeSearchData.query}. Our design team
          will use your responses to tailor their work to you. You can review
          your favourites, or start a new search, or put your feet up - you've
          earnt it
        </p>
        <div className="flex justify-end items-center gap-4">
          <Button onClick={onComplete}>Close</Button>
          <Button color="danger" onClick={() => navigate(routes.liked)}>
            View likes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center gap-8 w-[700px] max-w-full h-[500px] max- mx-auto">
      <Button color="danger" onClick={handleReject}>
        Delete 🚮
      </Button>
      <div className="relative w-full h-full">
        {stackSubset.map((photo, index) => {
          return (
            <div
              key={photo.id}
              className="absolute bg-white rounded-2xl transition-all"
              style={{
                left: -(index * 6),
                marginTop: index * 24,
                transform: `scale(${100 / (100 + index * 5)})`,
                transformOrigin: 'center',
                zIndex: 100 - index,
              }}
            >
              <Image
                src={photo?.src.large}
                width="500px"
                style={{ opacity: index === 0 ? 1 : 0.3 }}
              />
            </div>
          );
        })}
      </div>
      <Button color="success" onClick={handleLike}>
        Like
      </Button>
    </div>
  );
};
