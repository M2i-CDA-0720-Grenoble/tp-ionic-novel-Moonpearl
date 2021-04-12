import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonList, IonSpinner, IonTextarea, IonTitle } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import IBook from '../models/IBook';
import IReview from '../models/IReview';


interface SingleBookParams {
  id: string;
}


const SingleBook: React.FC = () => {
  const { id } = useParams<SingleBookParams>();

  const [book, setBook] = useState<IBook>();

  useEffect( () => {
    const getBook = async () => {
      const response = await fetch(`http://localhost:3000/books/${id}?_embed=chapters&_embed=reviews`);
      const json: IBook = await response.json();
      return json;
    }
    getBook().then(setBook);
  },
  [id]
  );

  const [content, setContent] = useState('');

  const handleClick = () => {
    const newReview: IReview = {
      content,
      createdAt: Date.now().toString(),
      bookId: book?.id as number
    };

    fetch(`http://localhost:3000/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReview),
    })
    .then(response => response.json())
    .then( (json: IReview) => {
      setContent('');
    })
  }

  if (typeof book === 'undefined') {
    return <IonSpinner />;
  }

  return (
    <>
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

      {
        book.reviews &&
        <IonList>
          {
            book.reviews.map(
              (review, index) =>
                <IonItem key={index}>{review.content}</IonItem>
            )
          }
        </IonList>
      }

      <IonTitle>Post a review</IonTitle>
      <IonTextarea
        value={content}
        onIonChange={event => setContent(event.detail.value as string)}
      />
      <IonButton expand="block" onClick={handleClick}>Post</IonButton>
    </>
  );
}

export default SingleBook;
