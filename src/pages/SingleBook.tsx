import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonList, IonSpinner } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import IBook from '../models/IBook';


interface SingleBookParams {
  id: string;
}


const SingleBook: React.FC = () => {
  const { id } = useParams<SingleBookParams>();

  const [book, setBook] = useState<IBook>();

  useEffect( () => {
    const getBook = async () => {
      const response = await fetch(`http://localhost:3000/books/${id}?_embed=chapters`);
      const json: IBook = await response.json();
      return json;
    }
    getBook().then(setBook);
  },
  [id]
  );

  if (typeof book === 'undefined') {
    return <IonSpinner />;
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>{book.title}</IonCardSubtitle>
        <IonCardTitle>{book.title}</IonCardTitle>
      </IonCardHeader>

      {
        book.chapters &&
        <IonList>
          {
            book.chapters.map(
              (chapter, index) =>
                <IonItem key={index}>{chapter.title}</IonItem>
            )
          }
        </IonList>
      }
    </IonCard>
  );
}

export default SingleBook;
