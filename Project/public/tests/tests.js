mocha.setup("bdd");

const { expect } = chai;

import User from 'user';
import Lobby from 'lobby';
import * as data from 'data';
import * as firebase from 'firebase';
import { firebaseDb as db } from 'firebaseConfig';
import userAuthentificator from 'userAuthentificator';

describe('Data layer tests', () => {
    describe('function() addNewUserInDatabase', () => {
        let addNewUserInDatabase;
        const defaultRef = db.ref();
        const testRef = defaultRef.child('test');
        const user = new User('testUsername', 'testFirstname', 'testLastname', 'testEmail');

        beforeEach(() => {
            addNewUserInDatabase = sinon.stub(data, 'addNewUserInDatabase');
        });

        afterEach(() => {
            addNewUserInDatabase.restore();
        });

        it('Should return a Promise', () => {
            addNewUserInDatabase.returns(Promise.resolve(testRef.set('test')));

            const promise = addNewUserInDatabase(user);

            expect(promise).to.be.an.instanceof(Promise);
        });

        it('Should be called with one parameter', () => {
            addNewUserInDatabase(user);

            expect(addNewUserInDatabase.args).to.have.length(1);
        });

        it('Should be called with the right parameter', () => {
            addNewUserInDatabase(user);

            const param = addNewUserInDatabase.args[0][0];

            expect(param).to.deep.equal(user);
        });

        it('Should be called once', (done) => {

            addNewUserInDatabase.returns(Promise.resolve());

            addNewUserInDatabase(user)
                .then(() => {
                    expect(addNewUserInDatabase).to.have.been.calledOnce;
                })
                .then(done, done);
        });
    });

    describe('function() addNewLobbyInDatabase', () => {
        let addNewLobbyInDatabase;
        const defaultRef = db.ref();
        const testRef = defaultRef.child('test');
        const lobby = new Lobby('testAuthor', 'testLobbyname', 'testSport', 'testLocation', 'testDatetime', 'testMode');

        beforeEach(() => {
            addNewLobbyInDatabase = sinon.stub(data, 'addNewLobbyInDatabase');
        });

        afterEach(() => {
            addNewLobbyInDatabase.restore();
        });

        it('Should return a Promise', () => {
            addNewLobbyInDatabase.returns(Promise.resolve(testRef.set('test')));

            const promise = addNewLobbyInDatabase(lobby);

            expect(promise).to.be.an.instanceof(Promise);
        });

        it('Should be called with one parameter', () => {
            addNewLobbyInDatabase(lobby);

            expect(addNewLobbyInDatabase.args).to.have.length(1);
        });

        it('Should be called with the right parameter', () => {
            addNewLobbyInDatabase(lobby);

            const param = addNewLobbyInDatabase.args[0][0];

            expect(param).to.deep.equal(lobby);
        });

        it('Should be called once', (done) => {

            addNewLobbyInDatabase.returns(Promise.resolve());;

            addNewLobbyInDatabase(lobby)
                .then(() => {
                    expect(addNewLobbyInDatabase).to.have.been.calledOnce;
                })
                .then(done, done);
        });
    });

    describe('function() deleteLobbyFromDatabase', () => {
        let deleteLobbyFromDatabase;
        const defaultRef = db.ref();
        const testRef = defaultRef.child('test');
        const lobby = new Lobby('testAuthor', 'testLobbyname', 'testSport', 'testLocation', 'testDatetime', 'testMode');

        beforeEach(() => {
            deleteLobbyFromDatabase = sinon.stub(data, 'deleteLobbyFromDatabase');
        });

        afterEach(() => {
            deleteLobbyFromDatabase.restore();
        });

        it('Should return a Promise', () => {
            deleteLobbyFromDatabase.returns(Promise.resolve(testRef.set('test')));

            const promise = deleteLobbyFromDatabase(lobby);

            expect(promise).to.be.an.instanceof(Promise);
        });

        it('Should be called with one parameter', () => {
            deleteLobbyFromDatabase(lobby);

            expect(deleteLobbyFromDatabase.args).to.have.length(1);
        });

        it('Should be called with the right parameter', () => {
            deleteLobbyFromDatabase(lobby);

            const param = deleteLobbyFromDatabase.args[0][0];

            expect(param).to.deep.equal(lobby);
        });

        it('Should be called once', (done) => {

            deleteLobbyFromDatabase.returns(Promise.resolve());

            deleteLobbyFromDatabase(lobby)
                .then(() => {
                    expect(deleteLobbyFromDatabase).to.have.been.calledOnce;
                })
                .then(done, done);
        });
    });

    describe('function() deleteJoinedLobbyFromUserDatabase', () => {
        let deleteJoinedLobbyFromUserDatabase;
        const defaultRef = db.ref();
        const testRef = defaultRef.child('test');
        const lobby = new Lobby('testAuthor', 'testLobbyname', 'testSport', 'testLocation', 'testDatetime', 'testMode');

        beforeEach(() => {
            deleteJoinedLobbyFromUserDatabase = sinon.stub(data, 'deleteJoinedLobbyFromUserDatabase');
        });

        afterEach(() => {
            deleteJoinedLobbyFromUserDatabase.restore();
        });

        it('Should return a Promise', () => {
            const defaultRef = db.ref();
            const testRef = defaultRef.child('test');

            deleteJoinedLobbyFromUserDatabase.returns(Promise.resolve());

            const promise = deleteJoinedLobbyFromUserDatabase(lobby);

            expect(promise).to.be.an.instanceof(Promise);
        });

        it('Should be called with one parameter', () => {
            deleteJoinedLobbyFromUserDatabase(lobby);

            expect(deleteJoinedLobbyFromUserDatabase.args).to.have.length(1);
        });

        it('Should be called with the right parameter', () => {
            deleteJoinedLobbyFromUserDatabase(lobby);

            const param = deleteJoinedLobbyFromUserDatabase.args[0][0];

            expect(param).to.deep.equal(lobby);
        });

        it('Should be called once', (done) => {

            deleteJoinedLobbyFromUserDatabase.returns(Promise.resolve());

            deleteJoinedLobbyFromUserDatabase(lobby)
                .then(() => {
                    expect(deleteJoinedLobbyFromUserDatabase).to.have.been.calledOnce;
                })
                .then(done, done);
        });
    });

    describe('function() deleteCreatedLobbyFromUserDatabase', () => {
        let deleteCreatedLobbyFromUserDatabase;
        const defaultRef = db.ref();
        const testRef = defaultRef.child('test');
        const lobby = new Lobby('testAuthor', 'testLobbyname', 'testSport', 'testLocation', 'testDatetime', 'testMode');

        beforeEach(() => {
            deleteCreatedLobbyFromUserDatabase = sinon.stub(data, 'deleteCreatedLobbyFromUserDatabase');
        });

        afterEach(() => {
            deleteCreatedLobbyFromUserDatabase.restore();
        });

        it('Should return a Promise', () => {
            const defaultRef = db.ref();
            const testRef = defaultRef.child('test');

            deleteCreatedLobbyFromUserDatabase.returns(Promise.resolve());

            const promise = deleteCreatedLobbyFromUserDatabase(lobby);

            expect(promise).to.be.an.instanceof(Promise);
        });

        it('Should be called with one parameter', () => {
            deleteCreatedLobbyFromUserDatabase(lobby);

            expect(deleteCreatedLobbyFromUserDatabase.args).to.have.length(1);
        });

        it('Should be called with the right parameter', () => {
            deleteCreatedLobbyFromUserDatabase(lobby);

            const param = deleteCreatedLobbyFromUserDatabase.args[0][0];

            expect(param).to.deep.equal(lobby);
        });

        it('Should be called once', (done) => {
            deleteCreatedLobbyFromUserDatabase.returns(Promise.resolve());

            deleteCreatedLobbyFromUserDatabase(lobby)
                .then(() => {
                    expect(deleteCreatedLobbyFromUserDatabase).to.have.been.calledOnce;
                })
                .then(done, done);
        });
    });

    describe('function() getData', () => {
        let getData;
        let testRef = 'test';

        beforeEach(() => {
            getData = sinon.stub(data, 'getData');
        });

        afterEach(() => {
            getData.restore();
        });

        it('Should return a Promise', () => {
            getData.returns(Promise.resolve());

            const promise = getData(testRef);

            expect(promise).to.be.an.instanceof(Promise);
        });

        it('Should be called with one parameter', () => {
            getData(testRef);

            expect(getData.args).to.have.length(1);
        });

        it('Should be called with the right parameter', () => {
            getData(testRef);

            const param = getData.args[0][0];

            expect(param).to.deep.equal(testRef);
        });

        it('Should be called once', (done) => {
            getData.returns(Promise.resolve());

            getData(testRef)
                .then(() => {
                    expect(getData).to.have.been.calledOnce;
                })
                .then(done, done);
        });
    });
});

describe('User authentication layer tests', () => {
    const LOCALSTORAGE_AUTH_KEY_NAME = 'authkey';
    const LOCALSTORAGE_EMAIL_KEY_NAME = 'emailkey';

	const clearLocalStorage = () => {
		localStorage.removeItem(LOCALSTORAGE_EMAIL_KEY_NAME);
		localStorage.removeItem(LOCALSTORAGE_AUTH_KEY_NAME);
	};

    beforeEach(() => {
        clearLocalStorage();
        });

        afterEach(() => {
           clearLocalStorage();
        });

	describe("function() registerUser", () => {
			let registerUser;

			beforeEach(() => {
				registerUser = sinon.stub(userAuthentificator, "registerUser");
			});
			afterEach(() => {
				registerUser.restore();

			});

			it('Should set user in the localStorage', (done) => {
				let user = {
					email: "test@abv.bg",
					password: "A1b2v3c4"
				};
			
				registerUser.returns(Promise.resolve());

				registerUser(user)
					.then(() => {
						console.log(localStorage)
						expect(localStorage.getItem('LOCAL_STORAGE_EMAIL')).to.equal(user.email)
					})
					.then(done, done);

			});

			it('Should be called with passed user', (done) => {
				let user = {
					email: "test@abv.bg",
					password: "A1b2v3c4"
				};
			
				registerUser.returns(Promise.resolve());

				registerUser(user)
					.then(() => {
						expect(registerUser).to.have.been.calledWith(user);
					})
					.then(done, done);

			});

			it('Should return a Promise', () => {
				const user = {
					email: "test@abv.bg",
					password: "A1b2v3c4"
				};

				registerUser.returns(Promise.resolve());

				const promise = registerUser(user);
				expect(promise).to.be.an.instanceof(Promise);
			});
		});
	
    describe("function() signIn", () => {
			let signIn;
            
			let LOCAL_STORAGE_EMAIL;

			beforeEach(() => {
				signIn = sinon.stub(userAuthentificator, "signIn");
			});

			afterEach(() => {
				signIn.restore();
				localStorage.removeItem(LOCAL_STORAGE_EMAIL);
			});

			it("Should add user in localstorge", (done) => {
				const user = {
				email: "test@abv.bg",
				password: "A1b2v3c4"
            };
            
			const response = {
				result: {
					username: user.username,
					authKey: 'SOME_AUTH_KEY'
				}
			};

			localStorage.LOCAL_STORAGE_EMAIL = user.email;

			signIn.returns(Promise.resolve(response));

			signIn(user.email, user.pass)
				.then(() => {
					expect(localStorage.getItem('LOCALSTORAGE_EMAIL_KEY_NAME')).to.equal(user.email);
				})
				.then(done, done);
		});
	});
});

mocha.run();
