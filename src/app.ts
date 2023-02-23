function bindHandler(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    // console.log(target)
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this)
            return boundFn;
        }
    }

    return adjDescriptor;
}

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionElement: HTMLInputElement;
    peopleElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        this.titleInputElement = this.element.querySelector("#title")!;
        this.descriptionElement = this.element.querySelector("#description")!;
        this.peopleElement = this.element.querySelector("#people")!;

        this.configure()
        this.attach();
    }

    private clearInput() {
        this.titleInputElement.value = '';
        this.descriptionElement.value = '';
        this.peopleElement.value = ''
    }

    private gatherUserInput(): [string, string, number] | void {
        const title = this.titleInputElement.value;
        const description = this.descriptionElement.value;
        const people = this.peopleElement.value;

        if(title.trim().length === 0 || description.trim().length === 0 || people.trim().length === 0) {
            alert('Invalid input, pls try again');
        } else {
            return [title, description, +people]
        }
    }

    @bindHandler
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if(Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            this.clearInput();
        }
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element)
    }

}


const projectInput = new ProjectInput()