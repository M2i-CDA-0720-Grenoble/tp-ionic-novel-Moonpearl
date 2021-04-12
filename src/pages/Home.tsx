import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList , IonItem } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import IBook from '../models/IBook';
import './Home.css';

const Home: React.FC = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  
  useEffect( () => {
    const getBooks = async () => {
      const response = await fetch(`http://localhost:3000/books`);
      const json: IBook[] = await response.json();
      return json;
    }
    getBooks().then(setBooks);

    // fetch(`http://localhost:3000/books`)
    // .then(response => response.json())
    // .then(json => setBooks(json));
  },
  []
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {
            books.map( (book, index) => 
              <IonItem key={index} routerLink={`/books/${book.id}`}>
                {book.title}
              </IonItem>
            )
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
